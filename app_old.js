"use strict";
//import express, {Express, Request, Response} from 'express';
//import dotenv from 'dotenv';
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
//const express = require ('express');
const app = express();
//const dotenv = require('dotenv');
const port = process.env.PORT || 8888;
app.get('/', (req, res) => {
    res.send('okey juga');
});
app.listen(port, () => {
    console.log(`server listen ${port}`);
});
