
  
    

  create  table "homepedia"."homepedia"."dvf_treated__dbt_tmp"
  
  
    as
  
  (
    

WITH source_data AS (
    SELECT
        date_mutation,
        no_voie,
        voie,
        commune,
        code_postal,
        code_departement,
        code_commune,
            COUNT(DISTINCT type_local) AS count_type_local,
    CASE
        WHEN COUNT(DISTINCT type_local) > 1 THEN 'lot'
        ELSE MAX(type_local)
    END AS type_local_or_lot,
    sum(Nombre_pieces_principales) as total_pièces,
    sum(distinct valeur_fonciere) AS total_valeur_fonciere,
    sum(distinct surface_terrain) AS max_surface_terrain,
    sum(distinct surface_reelle_bati) AS max_surface_reelle_bati
    FROM
        "homepedia"."homepedia_staging"."stg_dvf"
    WHERE Nature_mutation = 'Vente' and SUBSTRING(CAST(code_postal  AS VARCHAR), 1, 2) <> '97' and valeur_fonciere > 0
    GROUP BY
        date_mutation,
        no_voie,
        voie,
        commune,
        code_postal,
        code_departement,
        code_commune
order by  date_mutation, code_postal, voie, no_voie
)

SELECT
    row_number() OVER () AS id,
    *
FROM
    source_data
  );
  