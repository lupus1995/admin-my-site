export interface RTCPayload {
  target: string;
  caller: string;
  sdp: RTCSessionDescription;
}
