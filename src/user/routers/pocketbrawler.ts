export const buy_brawler = async (data_json: any): Promise<any> => {
  try {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data_json),
    };
    const response = await fetch(
      "http://localhost:3002/pocket",
      requestOptions
    );
    return new Promise((resolve) => {
      resolve(response);
    });
  } catch (err) {
    console.log(err);
  }
};
