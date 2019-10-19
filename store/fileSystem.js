const root = {
  name: 'root:',
  default: true
}

const trash = {
  name: 'Trash Bin',
  nodeType: 'trash',
  default: true,
  parent: root
}

function fetchData() {
  let data = JSON.parse(localStorage.getItem('fileSystem'))
  if(!data) return [trash]
  data.forEach(x => {
    if(x.parentID >= 0)
      x.parent = data[x.parentID]
    else if(x.parentID === -2)
      x.parent = trash
    else
      x.parent = root
    delete x.parentID
  })
  return [trash, ...data]
}

export const state = () => ({
  currentDirectory: root,
  currentFile: null,
  root: root,
  trash: trash,
  nodes: fetchData()
})

export const mutations = {
  up(state) {
    if(state.currentDirectory.name === 'root:') return
    if(state.currentDirectory.parent === null) return
    state.currentDirectory = state.currentDirectory.parent
  },
  changeDirectory(state, dir) {
    state.currentDirectory = dir
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
  createDirectory (state, {name}) {
    if(!name) return
    if(state.nodes.filter(x => x.name === name && x.parent === state.currentDirectory).length > 0) return
    state.nodes.push({
      nodeType: "directory",
      name,
      parent: state.currentDirectory
    })
  },
  findByPath (state, path) {

  },
  setCurrentFile(state, file) {
    state.currentFile = file
  },
  commitFileChanged(state, {name, content}) {
    if(!name) return
    if(state.nodes.filter(x => x !== state.currentFile && x.name === name && x.parent === state.currentDirectory).length > 0) return
    state.currentFile.name = name
    state.currentFile.content = content
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
  save(state) {
    let userNodes = state.nodes.filter(x => !x.default)
    const nodes = userNodes.map(x => {
      return {
        nodeType: x.nodeType,
        name: x.name,
        default: x.default,
        content: x.content,
        parentID: x.parent === state.trash ? -2 : userNodes.indexOf(x.parent)
      }
    })
    localStorage.setItem('fileSystem', JSON.stringify(nodes))
  }
}

export const actions = {
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
  },
  currentDirectory({ nodes, currentDirectory }) {
    return nodes.filter(x => x.parent === currentDirectory)
  },
  currentFile({ currentFile }) {
    return currentFile
  },
  allDirectories({root, nodes}) {
    return [root, ...nodes.filter(x => x.nodeType === 'directory')]
  }
}