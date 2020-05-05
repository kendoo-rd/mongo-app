const express = require('express');
const server = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

//  Connect to MongoDB
let db_host = 'mongodb://localhost';


//  Open a DB conneciton
MongoClient.connect(db_host, (err, dbHandler) => {

    //  In case of error
    if(err) { 
        console.log('There was an error...');
        throw err;
    }

    //  Log
    console.log('Connected successfully to MongoDB Server')
    
    
    //  Select db to work with
    let db = dbHandler.db('mydb');


    //  Update One
    //  ----------------------------------------------------------------- /
    
    db.collection('colors').updateOne({
        _id: new ObjectId('5eabf23ba969439fc9daa635')
    },{
    $set: {
        colorHexa: '#123123'
    }
    }, (err, result) => {

        if(err)
            throw err;

        console.log(`${result.result.nModified} Updated successfully`);
        dbHandler.close();
    })


    // FIND BY NAME
    // ----------------------------------------------------------------- /

    let query = {
        colorName: /^r/i            //  start with r  - case insensitive
    }

    db.collection('colors').find(query).toArray( (err, data) => {

        if(err)
            throw err;

        let colors = data;

        colors.forEach( color => {
            console.log( color );
        })

        //  Close DB Connection
        dbHandler.close();
    });




    //  FIND BY ID
    //  ----------------------------------------------------------------- /

    let query = {
        _id: new ObjectId('5eabf23ba969439fc9daa635')
    }

    db.collection('colors').findOne(query, (err, data) => {

        console.log( data );

        //  Close DB Connection
        dbHandler.close();
    });



    //  INSERT ONE
    //  ----------------------------------------------------------------- /
    
    let color = {
        colorName: 'tomato',
        hexaColor: '#43e432'
    }
    
    db.collection('colors').insertOne( color, (err, result) => {
        if(err) {
            console.log('Could not add to colors');
            throw err;
        }

        console.log('Color added, color id is:' + result.insertedId);

        //  Close DB Connection
        dbHandler.close();
    })

})


//  Start Server

server.listen(3000, () => {
    console.log('server started at port 3000');
})


