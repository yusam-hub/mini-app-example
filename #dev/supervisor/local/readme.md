####Supervisor

    yum install supervisor
    systemctl start supervisord
    systemctl status supervisord
    systemctl enable supervisord
    systemctl stop supervisord

    cd /etc/supervisord.d

    supervisorctl reread
    supervisorctl update

    netstat -ntlp | grep LISTEN

####LOCAL
    http://admin:Qwertyu1@192.168.0.223:9001/?basicauth=1
