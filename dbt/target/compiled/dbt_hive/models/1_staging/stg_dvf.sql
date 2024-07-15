WITH source_data AS (
    select
         id, 
        "No disposition" AS No_disposition,
        "Date mutation" AS Date_mutation,
        "Nature mutation" AS Nature_mutation,
        "Valeur fonciere" AS Valeur_fonciere,
        "No voie" AS No_voie,
        "B/T/Q" AS B_T_Q,
        "Type de voie" AS Type_de_voie,
        "Code voie" AS Code_voie,
        "Voie" AS Voie,
        "Code postal" AS Code_postal,
        "Commune" AS Commune,
        "Code departement" AS Code_departement,
        "Code commune" AS Code_commune,
        "Prefixe de section" AS Prefixe_de_section,
        "Section" AS Section,
        CAST("No plan" AS INTEGER) AS No_plan,
        "No Volume" AS No_Volume,
        "1er lot" AS premier_lot,
        cast( 
	        case
            when replace("Surface Carrez du 1er lot",',','.') = '' then '0' 
            else replace("Surface Carrez du 1er lot",',','.') 
        end as decimal) AS Surface_Carrez_du_1er_lot,
        "2eme lot" AS deuxieme_lot,
        cast( 
	        case
            when replace("Surface Carrez du 2eme lot",',','.') = '' then '0' 
            else replace("Surface Carrez du 2eme lot",',','.') 
        end as decimal) AS Surface_carrez_du_2eme_lot,
        "3eme lot"  AS troiseme_lot,
        cast( 
	        case
            when replace("Surface Carrez du 3eme lot",',','.') = '' then '0' 
            else replace("Surface Carrez du 3eme lot",',','.') 
        end as decimal) AS Surface_Carrez_du_3eme_lot,
        "4eme lot" AS quatrieme_lot,
        cast( 
	        case
            when replace("Surface Carrez du 4eme lot",',','.') = '' then '0' 
            else replace("Surface Carrez du 4eme lot",',','.') 
        end as decimal) AS Surface_Carrez_du_4eme_lot,
        "5eme lot"  cinquieme_lot,
        cast( 
	        case
            when replace("Surface Carrez du 5eme lot",',','.') = '' then '0' 
            else replace("Surface Carrez du 5eme lot",',','.') 
        end as decimal) AS Surface_Carrez_du_5eme_lot,
        "Nombre de lots" AS Nombre_de_lots,
        CAST("Code type local" AS INTEGER) AS Code_type_local,
        "Type local" AS Type_local,
        CAST("Surface reelle bati" AS INTEGER) AS Surface_reelle_bati,
        CAST("Nombre pieces principales" AS INTEGER) AS Nombre_pieces_principales,
        "Nature culture" AS Nature_culture,
        "Nature culture speciale" AS Nature_culture_speciale,
        "Surface terrain" AS Surface_terrain

    from 
        lake.dvf_data
)

SELECT * FROM source_data