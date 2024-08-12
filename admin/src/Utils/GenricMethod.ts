export const GetToken = () => {
    const tokenfromlocalstorage = localStorage.getItem("Token");
    return {
      headers: {
        Authorization: `Bearer ${tokenfromlocalstorage}`,
        "Content-Type": "application/json",
      },
    };
  };