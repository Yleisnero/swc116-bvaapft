SELECT 
  timestamp AS time,
  number AS num,
  DATE(timestamp) AS tx_date
FROM
  `bigquery-public-data.crypto_ethereum.blocks` AS blocks
WHERE number > 15537393
ORDER BY timestamp

https://console.cloud.google.com/bigquery?project=turing-chess-362313&ws=!1m14!1m8!1m3!1sturing-chess-362313!2sbquxjob_1a341155_18b663d8867!3sUS!14m3!1sturing-chess-362313!2sbquxjob_239b7cab_18b66479dff!3sUS!1m4!4m3!1sturing-chess-362313!2s123!3sasd!1m0

