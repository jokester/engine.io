import { Polling as XHR } from "./polling";
import { JSONP } from "./polling-jsonp";
import { WebSocket } from "./websocket";
import { WebTransport } from "./webtransport";
import type { PreparedIncomingMessage } from "../server";

export default {
  polling: polling as unknown as TransportConstructor,
  websocket: WebSocket as TransportConstructor,
  webtransport: WebTransport as TransportConstructor
};

interface TransportConstructor {
  new (req: PreparedIncomingMessage, ...more: any[]):
    | WebSocket
    | WebTransport
    | XHR
    | JSONP;
  upgradesTo?: string[];
}

/**
 * Polling polymorphic constructor.
 *
 * @api private
 */
function polling(req: PreparedIncomingMessage) {
  if ("string" === typeof req._query.j) {
    return new JSONP(req);
  } else {
    return new XHR(req);
  }
}
