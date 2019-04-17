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
