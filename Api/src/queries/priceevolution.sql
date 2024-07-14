SELECT
  DATE_TRUNC('month', date_mutation) AS month,
  AVG(valeur_fonciere) AS average_price,
  COUNT(*) AS sales_count
FROM stg_dvf
WHERE
  code_departement = ${codeDepartement}
  AND code_commune = ${codeCommune}
  AND nombre_pieces_principales BETWEEN ${pieces[0]} AND ${pieces[1]}
  AND valeur_fonciere BETWEEN ${BigInt(budget[0])} AND ${BigInt(budget[1])}
  AND date_mutation BETWEEN ${startDate} AND ${endDate}
GROUP BY DATE_TRUNC('month', date_mutation)
ORDER BY month DESC