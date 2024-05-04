import {syncReadFileBuffer} from '../core/reader';

const favicon = syncReadFileBuffer('./resource/favicon.ico');
export {favicon};

