// This file exists to ensure TypeScript correctly compiles import -> require
// We need the compiled require to work like:
// const anime = require('animejs').default
import * as anime from 'animejs'

export default anime
