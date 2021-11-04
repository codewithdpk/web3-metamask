const DOMAIN = `http://api-ropsten.etherscan.io/api?apikey=${process.env.REACT_APP_ETHERSCAN_API_TOKEN}&`;

export const getAllLogs = (account) => {
  const SUB_DOMAIN = `module=account&action=txlist&address=${account}&startblock=0&endblock=99999999&sort=asc`;
  console.log(`${DOMAIN}${SUB_DOMAIN}`);
  return fetch(`${DOMAIN}${SUB_DOMAIN}`)
    .then((res) => res.json())
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};
