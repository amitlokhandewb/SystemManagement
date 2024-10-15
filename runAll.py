import subprocess
import os

# Define the MFEs and their respective commands
mfe_commands = {
    "admin": "npm run start:standalone",
    "appbar": "npm run start:standalone",
    "assetinventory": "npm run start:standalone",
    "eventList": "npm run start:standalone",
    "login": "npm run start:standalone",
    "monitor": "npm run start:standalone",
    "register": "npm run start:standalone",
    "sidebar": "npm run start:standalone",
    "webshell": "npm start",  # Only webshell uses npm start
    # "backend" is not included as it is meant to be skipped
}

# The MFE to skip
skip_mfe = "backend"

# Run the commands
for mfe_dir, command in mfe_commands.items():
    if mfe_dir == skip_mfe:
        print(f"Skipping {mfe_dir}")
        continue

    # Open a new terminal window and run the command
    if os.name == "posix":  # For Unix-based systems
        subprocess.Popen(['gnome-terminal', '--', 'bash', '-c', f'cd {mfe_dir} && {command}; exec bash'])
    elif os.name == "nt":  # For Windows
        subprocess.Popen(f'start cmd /k "cd {mfe_dir} && {command}"', shell=True)
    else:
        print("Unsupported OS")
