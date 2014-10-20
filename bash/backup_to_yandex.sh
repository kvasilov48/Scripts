#!/bin/bash

#переменные Базы данных
DBHOST="localhost" #јдрес MySQL сервера
DBUSER="bd_user" #»м¤ пользовател¤ базы данных
DBPASS="dBpAsS" #ѕароль пользовател¤ базы данных
DBNAME="db_name" #»м¤ базы данных
DBARC=$DBNAME.sql.gz #»м¤ архива базы данных

#переменные WEBDAV
WEBDAVURL="https://webdav.yandex.ru/backup/" #јдрес яндекс.ƒиск. ѕапка должна существовать!
WEBDAVUSER="my-mail-login@yandex.ru" #»м¤ пользовател¤ от яндекс.ƒиска (яндекс.ѕочты)
WEBDAVPASS="MyPasWordAtYandexMail" #ѕароль от яндекс.ƒиска

#переменные сайта
SCRIPTDIR="/home/serveruser/backup/" #јбсолютный путь откуда запускаетс¤ скрипт и где хран¤тьс¤ архивы
SCRDIR="/home/serveruser/web/mydomain.com/public_html/" #јбсолютный путь к сайту от корн¤ диска
SCREXCLUDE="webstat" #„то не попадет в архив
SCRARC="public_html.tar.gz" #»м¤ архива файлов сайта

#переменные резервных копий
ARCNAME="mydomain.com"=$(date '+%F(%H:%M)')".tar" #»м¤ архивной копии сайта
ARCMAX="30" # оличество файлов в локальном хранилище

#переходим в корневую директорию вебсервера
cd $SCRDIR

#создаем файловый архив со сжатием, учитываем исключения
tar cfz $SCRIPTDIR$SCRARC --exclude=$SCREXCLUDE *

#возвращаемся в папку со скриптом, где лежат все архивы
cd $SCRIPTDIR

#архивируем базу данных со сжатием
mysqldump -h$DBHOST -u$DBUSER -p$DBPASS $DBNAME | gzip > $DBARC

#объединяем файловый архив и дамп базы данных, теперь уже без сжатия
tar cf $SCRIPTDIR$ARCNAME $SCRARC $DBARC

#отправляем результат в яндекс диск
curl --user $WEBDAVUSER:$WEBDAVPASS -T $ARCNAME $WEBDAVURL

#убираем промежуточные архивы
rm *.gz

#удаляем старые копии сайта, оставляем несколько свежих копий
ls -t *.tar | tail -n+$ARCMAX | xargs rm -f
