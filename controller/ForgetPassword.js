const { validationResult } = require('express-validator')
const User = require('../model/user.js');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const admin = require('../firebase')