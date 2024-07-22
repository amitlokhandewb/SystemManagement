using System;
using System.Numerics;
using System.Text;
using Newtonsoft.Json;
using Sodium;
using SystemManagementApp.Model;

public class BrancaService
{
    private readonly byte[] _key;

    public BrancaService(string key)
    {
        if (key.Length != 32)
        {
            throw new ArgumentException("Key must be 32 bytes long.");
        }
        _key = Encoding.UTF8.GetBytes(key);
    }

    public string CreateToken(BrancaTokenPayload payload)
    {
        payload.IssuedAt = DateTime.UtcNow;
        payload.ExpiresAt = DateTime.UtcNow.AddHours(1); // Token valid for 1 hour

        var payloadJson = JsonConvert.SerializeObject(payload);
        var payloadBytes = Encoding.UTF8.GetBytes(payloadJson);

        // Create the nonce
        var nonce = SecretBox.GenerateNonce();

        // Encrypt the payload
        var encryptedPayload = SecretBox.Create(payloadBytes, nonce, _key);

        // Combine the nonce and encrypted payload
        var combined = new byte[nonce.Length + encryptedPayload.Length];
        Buffer.BlockCopy(nonce, 0, combined, 0, nonce.Length);
        Buffer.BlockCopy(encryptedPayload, 0, combined, nonce.Length, encryptedPayload.Length);

        // Encode to Base62
        var token = Base62Encode(combined);

        return token;
    }

    public BrancaTokenPayload ValidateToken(string token)
    {
        // Decode from Base62
        var combined = Base62Decode(token);

        // Extract the nonce and encrypted payload
        var nonce = new byte[24];
        var encryptedPayload = new byte[combined.Length - 24];

        Buffer.BlockCopy(combined, 0, nonce, 0, nonce.Length);
        Buffer.BlockCopy(combined, nonce.Length, encryptedPayload, 0, encryptedPayload.Length);

        // Decrypt the payload
        var payloadBytes = SecretBox.Open(encryptedPayload, nonce, _key);
        var payloadJson = Encoding.UTF8.GetString(payloadBytes);

        var payload = JsonConvert.DeserializeObject<BrancaTokenPayload>(payloadJson);

        return payload;
    }

    private string Base62Encode(byte[] data)
    {
        const string alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var base62 = new StringBuilder();

        var value = new BigInteger(data.Reverse().Concat(new byte[] { 0 }).ToArray());

        while (value > 0)
        {
            var remainder = (int)(value % 62);
            value /= 62;
            base62.Insert(0, alphabet[remainder]);
        }

        return base62.ToString();
    }

    private byte[] Base62Decode(string base62)
    {
        const string alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var value = new BigInteger(0);

        foreach (var c in base62)
        {
            value *= 62;
            value += alphabet.IndexOf(c);
        }

        var bytes = value.ToByteArray();
        if (bytes[bytes.Length - 1] == 0)
        {
            Array.Resize(ref bytes, bytes.Length - 1);
        }

        return bytes.Reverse().ToArray();
    }
}
