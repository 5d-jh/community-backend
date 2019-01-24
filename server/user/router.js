'use strict';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

import Model from './model'; //users

const router = express.Router();

router.use(bodyParser.json());

router.post('/create', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const object = {username, password}
    Model.findOneAndUpdate(object, object, {upsert: true}, (err, doc) => {
        if (err) console.error(err);

        if (doc) {
            return res.status(409).json("user already exists");
        }
        res.status(200).json("user creation succeed");
    });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).json("user login succeed");
});

router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json("user logout succeed");
});

router.get('/info/:userId', (req, res) => {
    const projection = {
        username: true
    };
    Model.findById(req.params.userId, projection, (err, user) => {
        if (err) console.error(err);

        res.status(200).send(user.username);
    });
});

router.get('/sessioninfo', (req, res) => {
    if (!req.session.passport) {
        return res.status(404).json("session info not found");
    }

    const projection = {
        username: true
    };
    Model.findById(req.session.passport.user, projection, (err, user) => {
        if (err) console.error(err);

        res.status(200).json(user);
    });
});

export default router;