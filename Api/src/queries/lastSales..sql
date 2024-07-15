SELECT
  date_mutation,
  valeur_fonciere,
  nombre_pieces_principales,
  surface_reelle_bati,
  type_local
FROM stg_dvf
WHERE
  code_departement = ${codeDepartement}
  AND code_commune = ${codeCommune}
  AND nombre_pieces_principales BETWEEN ${pieces[0]} AND ${pieces[1]}
  AND valeur_fonciere BETWEEN ${BigInt(budget[0])} AND ${BigInt(budget[1])}
  AND date_mutation BETWEEN ${startDate} AND ${endDate}
ORDER BY date_mutation DESC
LIMIT 10