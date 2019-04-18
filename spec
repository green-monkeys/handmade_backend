capstone406.herokuapp.com
/cga
    GET /:cgaId
        Returns CGA object with ID :cgaId
    POST /
        Body
            - email
            - firstName
            - lastName
    DELETE /:cgaId
        Deletes CGA with ID :cgaId
    GET /
        Query
            - email
    GET /artisans
        Query
            - email
    GET /image
        Query
            - email
/artisan
    GET /:artisanId
        Returns Artisan object with ID :artisanId
    POST /
        Body
            - email
            - firstName
            - lastName
            - cgaId
            - password
            - salt
    DELETE /:artisanId
        Deletes Artisan with ID :artisanId
    GET /
        Query
            - username
    GET /image
        Query
            - username
/payout
    GET /:payoutId
        Returns Payout object with ID :payoutId
    POST /
        Body
            - cgaId
            - artisanId
            - amount
    DELETE /:payoutId
        Deletes Payout with ID :payoutId
/aws
    POST /image
        Body (form-data)
            - image
        Query
            - folder (artisan|cga)
            - filename (artisan username|cga email)
