const account_table =
`
CREATE TABLE \`t_account\` (
  \`uid\` varchar(50) NOT NULL,
  \`account_name\` varchar(20) NOT NULL,
  \`account_desc\` varchar(30) DEFAULT NULL,
  \`account_time\` date NOT NULL,
  \`account_id\` int(12) NOT NULL AUTO_INCREMENT,
  \`account_type\` varchar(10) NOT NULL,
  \`account_money\` int(12) NOT NULL,
  PRIMARY KEY (\`account_id\`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
`
const user_table = 
`
CREATE TABLE \`t_user\` (
  \`uid\` varchar(50) NOT NULL,
  \`name\` varchar(20) NOT NULL,
  \`password\` varchar(50) NOT NULL,
  \`is_delete\` int(1) NOT NULL,
  \`nick_name\` varchar(20) NOT NULL,
  \`create_time\` date NOT NULL,
  PRIMARY KEY (\`uid\`,\`name\`),
  UNIQUE KEY \`name\` (\`name\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
`

module.exports ={
  account_table,
  user_table
}