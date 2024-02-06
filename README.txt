다중디비연결시 원격접속 권한 및 사용자 설정
CREATE USER 'car008'@'115.95.188.130' IDENTIFIED BY 'your_password';
GRANT SELECT ON car008.ecount_no_send TO 'car008'@'115.95.188.130';
FLUSH PRIVILEGES;


SHOW GRANTS FOR 'car008'@'115.95.188.130';



CREATE USER 'car008'@'localhost' IDENTIFIED BY 'your_password';
GRANT GRANT OPTION ON *.* TO 'your_user'@'localhost';
FLUSH PRIVILEGES;