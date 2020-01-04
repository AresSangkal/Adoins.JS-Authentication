'use strict'
const Database = use('Database')
const Hash = use('Hash')

class LoginController {
    async index({ view }) {

        return view.render('auth-login')
    }

    async store ({ auth, request, response, session ,view}) {
        /**
         * Getting needed parameters.
         *
         * ref: http://adonisjs.com/docs/4.0/request#_all
         */
        const { username, password, email} = request.all()

        /**
         * Wrapping the authentication in order to
         * handle errors when authentication fail.
         *
         * ref: http://adonisjs.com/docs/4.0/authentication#_attempt_uid_password
         */
        
               const check =  await Database
                .table('users')
                .where('username', username)
                .first()

                if(check == null) {
                    const data = { message : "This user is invalid . please use correct name and password" }
                    return view.render('auth-login', data)
                }
                else {
                    const isSame = await Hash.verify(password, check.password)
                    if(!isSame){
                        const data = { message : "This user is invalid . please use correct name and password" }
                        return view.render('auth-login', data)
                    } 
                    const data = {auth: 'true'}
                    return view.render('home', data)
                }
    
        /**
         * We are authenticated.
         */
        
      }
    
      async logout ({ auth, view }) {
        /**
         * Logout the user.
         *
         * ref: http://adonisjs.com/docs/4.0/authentication#_logout
         */
        const data = {auth: 'false'}
        return view.render('home', data)
      }


}

module.exports = LoginController
