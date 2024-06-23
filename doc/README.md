# Bien utiliser la Base Nationale du Bâtiment
Bienvenue sur cette extraction de la Base Nationale du Bâtiment

[TOC]

## Installer les bons outils

En fonction du format de votre extraction, vous aurez besoin d'outils différents.

### Pour un pgdump (.sql)
- Installer le gestionnaire de base de données **Postgresql** et activer l'extension **Postgis**
- Créer un fichier .pgservice.conf dans votre home
- Y insérer la configuration de votre serveur
```
[nom_de_votre_service]
user=votre_utilisateur
password=votre_mot_de_passe
dbname=votre_base_de_donnees
host=votre_host(default:localhost)
port=votre_port_de_connection(default:22)
```
- Mettez-vous dans le dossier où se trouve le pgdump
- Lancer la commande psql suivante (linux) : `psql service=nom_de_votre_service -f bdnb.sql > log_extract.log 2>log_extract_erreurs.log`
- (alternative windows powershell) : `psql -f bdnb.sql service=local_bdnb *> log_extract.log 2> log_extract_erreurs.log`


### Pour un géopackage (.gpkg)
- Installer et ouvrir le fichier avec le service SIG QGIS

### Pour du csv
- Attention, ce sont des fichiers lourds, difficilement ouvrables avec Excel
- Vous pouvez vous en servir pour de l'exploitation avec Python : module pandas.read_csv avec le paramètre `chunksize`


## Ce que contient cette extraction

Cette extraction contient à minima :
- Vos données
- Les contours géométriques consistants du réferentiel administratif utilisé pour la construction de la BDNB (format gpkg et pgdump)
- Ce fichier de bonnes pratiques
- Un dictionnaire de variable pour vous repérer dans les différentes colonnes de la base de données

## Nous contacter

Vous avez un problème sur vos données, sur leur utilisation ou vous souhaitez nous faire un retour pour nous améliorer, n'hésitez pas à nous contacter en ouvrant un ticket sur le gitlab du projet  
Nous y répondrons le plus rapidement possible : https://gitlab.com/BDNB/base_nationale_batiment/-/issues

## License

Les données en open data diffusées dans la BDNB sont soumises à [la licence ouverte v2.0 d'Etalab](https://www.etalab.gouv.fr/licence-ouverte-open-licence/). 
Cette licence autorise une utilisation, une réutilisation et une rediffusion sous contrainte simple de citation, y compris pour des usages commerciaux.  

Les données à accès restreint disponibles sont documentées dans le dictionnaire de données. 
Leur accès est soumis à des restrictions pour les raisons suivantes :
- La donnée source n'est accessible qu'aux ayants droits des données d'origine (exemple des fichiers fonciers) nécessitant une convention de mise à disposition.
- Le producteur d'origine soumet la réutilisation à une redevance d'accès.

Si ces données vous sont nécessaires, vous pouvez contacter l'équipe commerciale BDND du CSTB :
 - en créant un [ticket confidential](https://gitlab.com/BDNB/base_nationale_batiment/-/issues/new?issuable_template=template_ticket_commercial&issue[confidential]=true&issue)
 - en envoyant un mail directement à `contact-project+bdnb-base-nationale-batiment-gorenove@incoming.gitlab.com`  

