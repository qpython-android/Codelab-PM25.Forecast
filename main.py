#-*-coding:utf-8;-*-
#qpy:webapp:PM2.5早知道
#qpy:fullscreen
#qpy://127.0.0.1:8080/
"""
PM2.5 BROADCAST
"""
import os
from bottle import Bottle, ServerAdapter
from bottle import run, debug, route, error, static_file, template

root = os.path.dirname(os.path.abspath(__file__))

######### QPYTHON WEB SERVER ###############

class MyWSGIRefServer(ServerAdapter):
    server = None

    def run(self, handler):
        from wsgiref.simple_server import make_server, WSGIRequestHandler
        if self.quiet:
            class QuietHandler(WSGIRequestHandler):
                def log_request(*args, **kw): pass
            self.options['handler_class'] = QuietHandler
        self.server = make_server(self.host, self.port, handler, **self.options)
        self.server.serve_forever()

    def stop(self):
        #sys.stderr.close()
        import threading 
        threading.Thread(target=self.server.shutdown).start() 
        #self.server.shutdown()
        self.server.server_close() #<--- alternative but causes bad fd exception
        print "# qpyhttpd stop"


######### BUILT-IN ROUTERS ###############
@route('/__exit', method=['GET','HEAD'])
def __exit():
    global server
    server.stop()

@route('/__ping')
def __ping():
    return "ok"


@route('/assets/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root=root+"/assets")


######### WEBAPP ROUTERS ###############
@route('/')
def home():
    """
    """
    return template(root+"/templates/home.tpl")

######### WEBAPP ROUTERS ###############
if __name__ == '__main__':
    app = Bottle()
    app.route('/__exit', method=['GET','HEAD'])(__exit)
    app.route('/__ping', method=['GET','HEAD'])(__ping)
    app.route('/assets/<filepath:path>', method='GET')(server_static)

    app.route('/', method=['GET','HEAD'])(home)

    try:
        server = MyWSGIRefServer(host="127.0.0.1", port="8080")
        app.run(server=server,reloader=False)
    except Exception,ex:
        print "Exception: %s" % repr(ex)
