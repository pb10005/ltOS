import firebase from '~/plugins/firebase.js'
import { auth } from 'firebase';

const db = firebase.firestore()

export const state = () => ({
    currentUser: {},
    users: [],
    fss: []
})

export const mutations = {
    setUsers(state, payload) {
        state.users = payload
    },
    setCurrentUser(state, payload) {
        state.currentUser = payload
    },
    setFss(state, payload) {
        state.fss = payload
    },
    clearFss(state) {
        state.fss = []
    }
}

export const actions =  {
    auth(context, payload) {
        auth().signInWithEmailAndPassword(payload.email, payload.password)
           .then(() => {
               context.dispatch('cloud/getFSsByUserName')
           })
            .catch(err => {
                context.commit('clearFss')
            })
    },
    getCurrentUser(context, payload) {
        if(!auth().currentUser) return
        db.collection('users')
            .doc(auth().currentUser.uid)
            .get()
            .then(doc => {
                context.commit('setCurrentUser', doc.data())
            })
    },
    getUser(context, payload) {
        let items = db.collection('users')
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            context.commit('setUsers', doc.data())
                        })
                    })
    },
    getFSsByUsername(context) {
        if(!auth().currentUser) return 
        let fss = []
        db.collection('fss')
            .where('user', '==', auth().currentUser.uid)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    fss.push({
                        id: doc.id,
                        name: doc.data().name
                    })
                })
                context.commit('setFss', fss)
            })
            .catch(error => {
                fss = []
                context.commit('setFss', fss)
            })
    },
    signOut() {
        auth().signOut()
    }
} 

export const getters = {
    currentUser({ currentUser }) {
        return currentUser
    },
    users({ users }) {
        return users
    },
    fss({ fss }) {
        return fss
    }
}
