# Clean Archtecture

## Iniciando os estudos em clean archtecture

### Exemplo de divisão de responsabilidades de uma arquitetura muito simplificada de login


        // const express = require('express')
        // const router = express.Router()

        module.exports = () => {
        const router = new SignUpRouter()
        router.post('/signup', ExpressRouterAdapter.adapt(router))
        }

        // Framework adapter
        class ExpressRouterAdapter {
        static adapt (router) {
            return async (req, res) => {
            const httpRequest = {
                body: req.body
            }
            const httpResponse = router.route(httpRequest)
            res.status(httpResponse.statuscode).json(httpResponse.body)
            }
        }
        }

        // Presentation layer - o que a api expõe para o client - rotas
        // signup - router receive a httpReq and return a httpResponse object
        class SignUpRouter {
        async route (httpRequest) {
            const { email, password, repeatPassword } = httpRequest.body
            const user = new SignUpUseCase().signUp(email, password, repeatPassword)
            return {
            statuscode: 200,
            body: user
            }
        }
        }

        // Domain layer - Use cases - Regras de negócio
        // signup user case - business rules
        class SignUpUseCase {
        async signUp (email, password, repeatPassword) {
            if (password === repeatPassword) {
            new AddAccountrepository().add(email, password)
            }
        }
        }

        // Infra layer
        // add-account-repository
        const mongoose = require('mongoose')
        const AccountModel = mongoose.model('Account')

        class AddAccountrepository {
        async add (email, password) {
            const user = await AccountModel.create({ email, password })
            return user
        }
        }
