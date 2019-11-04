import { auth } from 'firebase'

export default function ({ store, redirect }) {
    auth().onAuthStateChanged((user) => {
        if (user === null) {
            return redirect('/login')
        }
    })
}