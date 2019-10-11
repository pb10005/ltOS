export const state = () => ({
  currentDirectory: {
    name: "root:"
  },
  currentFile: null,
  nodes: [],
  files: []
})

export const mutations = {
  up(state) {
    if(state.currentDirectory.name === "root:") return
    state.currentDirectory = state.currentDirectory.parent
  },
  changeDirectory(state, name) {
    let d = state.nodes.find(x => x.name === name && x.parent === state.currentDirectory)
    state.currentDirectory = d
  },
  createFile (state, {name, content}) {
    if(state.nodes.filter(x => x.name === name && x.parent === state.currentDirectory).length > 0) return
    state.nodes.push({
      nodeType: "file",
      name,
      content,
      parent: state.currentDirectory
    })
  },
  createDirectory (state, {name , content, parentPath}) {
    if(state.nodes.filter(x => x.name === name && x.parent === state.currentDirectory).length > 0) return
    state.nodes.push({
      nodeType: "directory",
      name,
      content,
      parent: state.currentDirectory
    })
  },
  findByPath (state, path) {

  },
  setCurrentFile(state, file) {
    state.currentFile = file
  },
  commitFileChanged(state, file) {

  }
}

export const actions = {
  commitFileChanged(context, payload) {
    context.commit('commitFileChanged')
  }
}

export const getters = {
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
    return currentDirectory.name
  },
  currentDirectory({ nodes, currentDirectory }) {
    return nodes.filter(x => x.parent === currentDirectory)
  },
  currentFile({ currentFile }) {
    return currentFile
  }
}