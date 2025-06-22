INSERT INTO user_tbl (id, username, password_hash, content_administrator, reviewer, user_administrator) SELECT
	nextval('user_seq'),
	'superuser',
	'$2a$10$r0NIrZ4T23razkU1JcEoruousCFi4E9hFucctSBipbeoleDZuD2RS', -- 'superuser'
	true, true, true
WHERE NOT EXISTS (SELECT * FROM user_tbl WHERE username = 'superuser');
