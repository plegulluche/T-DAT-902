
  
    

  create  table "hive"."atlas_staging"."stg_hive__hive__dbt_tmp"
  
  
    as
  
  (
    WITH source_data AS (
    select 
        *
    from 
        "hive"."lake"."hive"
)

SELECT * FROM source_data
  );
  