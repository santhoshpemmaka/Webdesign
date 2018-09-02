# Log Analysis
-----------------------------------------------------------------------------
## Project Overview
> This is the project for the Udacity Full stack Web Development Nanodegree. Being new to databases this project was difficult because it had us create complex SQL queries to access a very large database and extract specific data and print it out. This project is an internal reporting tool by taking log data and calculating statistics from it.
## Technologies Used
* [Python 3](https://www.python.org/) - Language the project is coded in
* [Vargant](https://www.vagrantup.com/) -For a dev VM for a local prod-like env
* [Virtual](https://www.virtualbox.org/) -Required for Vagrant
* [Git](https://git-scm.com/) -Source code management

## Setup
1. Install VirtualBox and Vagrant
2. Clone this repository
3. Download the database from[here](http://mulligan.tech/newsdata.zip)
4. Make sure vagrant is running by using the 'vagrant up'command
5. Then log into vagrant using 'vagrant ssh'
6. Load the data from the database using the command 'psql -d news -f newwsdata.sql'
7. Create **views** for the database (see below)
8. Run 'python news.py'
9. Output will be displayed in bash

## Note
 1. This database includes three tables:
  
 * Articles (author, title, slug, lead, body, time, id)
 * Authors (name, bio, id)
 * Log (path, ip, method, status, time, ip)
 
## Views
> Views were used only for question 3 to break the problem down to understand it easier.

## error view
    CREATE VIEW error_view AS
        SELECT date(time), count(status)
        FROM log
        WHERE status != '200 OK'
        GROUP BY date(time)
        ORDER BY count(status);
        
## all view
    CREATE VIEW all_view AS
        SELECT date(time), count(status)
        FROM log
        GROUP BY date(time)
        ORDER BY count(status);
        
## query_3
    CREATE VIEW query_3 AS
        SELECT errors.date, e.count AS errors, errors.count AS all
        FROM all_view errors
        LEFT JOIN error_view e
        ON errors.date=e.date;
        
## percent_error
    CREATE VIEW percent_error AS
        SELECT errors.date, CAST (errors.errors as float) / errors.all * 100 AS percent
        FROM query_3 errors
        WHERE CAST (errors.errors as FLOAT) / errors.all * 100 > 1;
