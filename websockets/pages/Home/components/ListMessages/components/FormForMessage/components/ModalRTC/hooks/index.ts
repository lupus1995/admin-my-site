/**
 * createPeer используется внутри webRTC, поэтому экспортировать из папки hooks нельзя
 * в отдельную папку createPeer также не вижу смысла перемещать, потому что это просто hook
 * в хелперы createPeer также нельзя переместить,потому что в нем нужен функционал хуков
 * на вышесказанном описании createPeer был оставлен в папке hooks на одном уровне с хуком webRTC
 */

export { useWebRTC } from "./webRTC";
