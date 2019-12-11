import firebase from '~/plugins/firebase.js'
import { auth } from 'firebase';

import uuid from "uuid/v4"

const db = firebase.firestore()

const root = {
  id: 'root',
  name: 'root:',
  default: true
}

const trash = {
  id: 'trash',
  name: 'Trash Bin',
  nodeType: 'trash',
  default: true,
  parent: root
}

export const state = () => ({
  currentDirectory: root,
  currentFile: null,
  root: root,
  trash: trash,
  name: '',
  nodes: [],
  currentID: '',
  ownerID: '',
  owner: ''
})

export const mutations = {
  createFile (state, {name, content, instanceID, parentID}) {
    if(!name) return
    const id = uuid()
    return db.collection("fss")
        .doc(instanceID)
        .collection("nodes")
        .doc(id)
        .set({
            id,
            nodeType: "file",
            name,
            content,
            parentID
        })
  },
  createDirectory (state, {name, instanceID, parentID}) {
    if(!name) return
    const id = uuid()
    return db.collection("fss")
        .doc(instanceID)
        .collection("nodes")
        .doc(id)
        .set({
            id,
            nodeType: "directory",
            name,
            parentID
        })
  },
  setCurrentFile(state, file) {
    state.currentFile = file
  },
  removeDirectory(state, node) {
    if(state.currentDirectory === state.trash) {
      state.nodes = state.nodes.filter(x => {
        let tmp = x
        let count = 0
        while(tmp !== state.root) {
          if(count++ >= 1000) break
          if(tmp === node) {
            return false
          }
          tmp = tmp.parent
        }
        return true
      })
    } else {
      node.parent = state.trash
    }
  },
  removeFile(state, node) {
    if(state.currentDirectory === state.trash) {
      state.nodes = state.nodes.filter(x => x !== node)
    } else {
      node.parent = state.trash
    }
  },
  setCurrentID(state, payload) {
    state.currentID = payload.id
    state.name = payload.name
  },
  setFS(state, payload) {
    state.nodes = payload
  },
  setFSName(state, payload) {
      state.name = payload
  },
  setOwner(state, payload) {
      state.owner = payload.owner
      state.ownerID = payload.ownerID
  }
}

export const actions = {
  getFS(context, payload){
    const instance = db.collection('fss')
    .doc(payload.id)
    instance.get()
    .then(doc => {
        context.commit('setFSName', doc.data().name)
        db.collection('users')
            .doc(doc.data().user)
            .get()
            .then(userRef => {
                context.commit('setOwner', {
                    owner: userRef.data().displayName,
                    ownerID: doc.data().user
                })
            })
    })
    return instance
  },
  getFile(context, payload) {
      return new Promise((resolve, reject) => {
        db.collection('fss')
            .doc(payload.instanceID)
            .collection('nodes')
            .doc(payload.fileID)
            .get()
            .then(doc => {
                context.commit('setCurrentFile', doc.data())
                resolve()
            })
            .catch(() => {
                reject()
            })
      })
  },
  updateFile(context, { instanceID, fileID, name, content }) {
      return db.collection('fss')
        .doc(instanceID)
        .collection('nodes')
        .doc(fileID)
        .update({
            name,
            content
        })
  },
  getNode(context, payload) {
      return new Promise((resolve, reject) => {
          db.collection('fss')
            .doc(payload.instanceID)
            .collection('nodes')
            .doc(payload.nodeID)
            .get()
            .then(doc => {
                resolve(doc.data())
            })
            .catch(() => {
                reject()
            })
      })
  },
  async fetchNodesByParentID(context, payload) {
      let nodes = []
      await db.collection('fss')
        .doc(payload.instanceID)
        .collection('nodes')
        .where('parentID', '==', payload.dirID)
        .orderBy('name')
        .orderBy('nodeType')
        .get()
        .then(docs => {
            docs.forEach(doc => {
                nodes.push(doc.data())
            })
        })
      context.commit('setFS', nodes)
  }
}

export const getters = {
  instanceName({ name }) {
      return name
  },
  currentDirectoryPath({currentDirectory}) {
    let path = ''
    let dir = currentDirectory
    while(true) {
      if(dir.parent) {
        path = dir.name + '/' + path
        dir = dir.parent
      }
      else return '/' + path
    }
  },
  currentDirectory({ nodes, currentDirectory }) {
    return nodes
  },
  currentFile({ currentFile }) {
    return currentFile
  },
  allDirectories({root, nodes}) {
    return [root, ...nodes.filter(x => x.nodeType === 'directory')]
  },
  owner({ owner, ownerID }) {
      return {
          name: owner,
          id: ownerID
      }
  }

}
