import firebase from '~/plugins/firebase.js'
import { auth } from 'firebase';

const db = firebase.firestore()

export const state = () => ({
    users: [],
    fss: []
})

export const mutations = {
    setUsers(state, payload) {
        state.users = payload
    },
    setFss(state, payload) {
        state.fss = payload
    }
}

export const actions =  {
    async auth(context, payload) {
        auth().signInWithEmailAndPassword(payload.email, payload.password)
            .catch(err => {
                console.log(err)
            })
    },
    async getUser(context, payload) {
        let items = db.collection('users')
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            context.commit('setUsers', doc.data())
                        })
                    })
    },
    async getFSsByUsername(context) {
        let fss = []
        await db.collection('fss')
            .where('user', '==', auth().currentUser.uid)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    fss.push({
                        id: doc.id
                    })
                })
            })
        context.commit('setFss', fss)
    },
    async getFSByID(context, payload) {
    },
    async signOut() {
        auth().signOut()
    }
} 

export const getters = {
    users({ users }) {
        return users
    },
    fss({ fss }) {
        return fss
    }
}
