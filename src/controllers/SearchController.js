const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

    async index(request, response) {
        //buscar todos devs em um raio de 10KM...
        //filtrar por tecnologias...

        console.log(request.query);
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);

        console.log(techsArray);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
               $near: {
                   $geometry: {
                       type: 'Point',
                       coordinates: [longitude, latitude],
                   },
                   $maxDistance: 10000,
               }, 
            },
        });
        
        return response.json(devs);
    }
};

