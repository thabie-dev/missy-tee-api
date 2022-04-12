// add code in here to create an API with ExpressJS
const express = require('express');
const cors =require('cors')
const app = express();
// import the dataset to be used here
const garments = require('./garments.json');

// enable the static folder...
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())


// API routes to be added here
// app.get('/api/garments', function(req, res){
//     // note that this route just send JSON data to the browser
//     // there is no template
//     res.json({garments});
// });


app.get('/api/garments', function(req, res){

    const gender = req.query.gender;
    const season = req.query.season;

    const filteredGarments = garments.filter(garment => {
        // if both gender & season was supplied
        if (gender != 'All' && season != 'All') {
            return garment.gender === gender 
                && garment.season === season;
        } else if(gender != 'All') { // if gender was supplied
            return garment.gender === gender
        } else if(season != 'All') { // if season was supplied
            return garment.season === season
        }
        return true;
    });

    // note that this route just send JSON data to the browser
    // there is no template
    res.json({ 
        garments : filteredGarments
    });
});


    // app.get('/api/garments/price/:price', function(req, res){
    // const maxPrice = Number(req.params.price);
    // const filteredGarments = garments.filter( garment => {
    //     // filter only if the maxPrice is bigger than maxPrice
    //     if (maxPrice > 0) {
    //         return garment.price <= maxPrice;
    //     }
    //     return true;
    // });

    app.get('/api/garments/price/:price', function(req, res){
        const maxPrice = Number(req.params.price);
        const filteredGarments = garments.filter( garment => {
            // filter only if the maxPrice is bigger than maxPrice
            if (maxPrice > 0) {
                return garment.price <= maxPrice;
            }
            return true;
        });
    
        res.json({ 
            garments : filteredGarments
        });
    });

    app.post('/api/garments', (req, res) => {

        // get the fields send in from req.body
        const {
            description,
            img,
            gender,
            season,
            price
        } = req.body;
    
        // add some validation to see if all the fields are there.
        // only 3 fields are made mandatory here
        // you can change that
    
        if (!description || !img || !price) {
            res.json({
                status: 'error',
                message: 'Required data not supplied',
            });
        } else {
    
            // you can check for duplicates here using garments.find
            
            // add a new entry into the garments list
            garments.push({
                description,
                img,
                gender,
                season,
                price
            });
    
            res.json({
                status: 'success',
                message: 'New garment added.',
            });
        }
    
    });
    
       








//});

// function filterData() {
//     axios.get(`/api/garments?gender=${genderFilter}&season=${seasonFilter}`)
//         .then(function(result) {
//             searchResultsElem.innerHTML = garmentsTemplate({
//                 garments : result.data.garments
//             })
//         });
//     }


// });

const PORT = process.env.PORT || 4017;
app.listen(PORT, function() {
console.log(`App started on port ${PORT}`)
       
});