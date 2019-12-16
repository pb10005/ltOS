import firebase from '~/plugins/firebase.js'
import { auth } from 'firebase';
import { resolve } from 'path';

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
    register(context, { email, password }) {
        return auth().createUserWithEmailAndPassword(email, password)
    },
    auth(context, payload) {
        return auth().signInWithEmailAndPassword(payload.email, payload.password)
    },
    getCurrentUser(context, payload) {
        auth().onAuthStateChanged((user) => {
            if(!user) return
            db.collection('users')
                .doc(user.uid)
                .get()
                .then(doc => {
                    context.commit('setCurrentUser', doc.data())
                })
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
        auth().onAuthStateChanged((user) => {
            let fss = []
            db.collection('fss')
                .where('user', '==', user.uid)
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
        })
    },
    createInstance(context, payload) {
        const user = auth().currentUser
        if(!user) return
        db.collection('fss')
            .add({
                name: payload.name,
                private: payload.private,
                user: user.uid
            })
    },
    sendPasswordResetMail() {
        const addr = auth().currentUser.email
        if(!addr) return
        return auth().sendPasswordResetEmail(addr)
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
