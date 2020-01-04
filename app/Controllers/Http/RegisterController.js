'use strict'
const User = use('App/Models/User')
const Database = use('Database')
// const { validate } = use('Validator')



class RegisterController {

    async index({ view }) {

        return view.render('auth-register')
    }

    async register ({ request, response }) {

        const { username, email, password } = request.all()

        await Database
            .table('users')
            .insert({username: username, email:email, password:password})
        

        return response.redirect('/')
      }


      async store ({ session, request, response, view }) {
        /**
         * Getting needed parameters.
         *
         * ref: http://adonisjs.com/docs/4.0/request#_only
         */
        const data = request.only(['username', 'email', 'password', 'password_confirmation'])

        const { username, email, password } = request.all()

    
        delete data.password_confirmation
    
        /**
         * Creating a new user into the database.
         *
         * ref: http://adonisjs.com/docs/4.0/lucid#_create
         *
         */
        const check =  await Database
                .table('users')
                .where('username', username)
                .first()
        if(check) {
            const data = { message : "This name already registered . please use another name" }
            return view.render('auth-register', data)
            
        }
        
        const checkagain = await Database
        .table('users')
        .where('email', email)
        .first()
        if(checkagain) {
            const data = { message : "This email already registered . please use another email" }
            return view.render('auth-register', data)
        }
        await User.create(data)
    
        return response.redirect('/')
      }
    
}

module.exports = RegisterController
