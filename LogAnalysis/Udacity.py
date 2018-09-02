#!/usr/bin/env python

import psycopg2

database_name = "news"

# Store queries into variables
q1 = ("""SELECT title, count(*) as num FROM articles, log
      WHERE articles.slug = substring(log.path, 10)
      GROUP BY title ORDER BY num DESC LIMIT 3;""")
q2 = ("""SELECT authors.name, count(*) AS num
      FROM articles
      JOIN authors on articles.author = authors.id
      JOIN log on articles.slug = substring(log.path, 10)
      WHERE log.status LIKE '200 OK'
      GROUP BY authors.name ORDER BY num desc;""")
q3 = ("""SELECT to_char(errors.date, 'Mon DD, YYYY'),
      round( cast(errors.percent as numeric), 3) FROM percent_error errors;""")

# Store results
q1_results = dict()
q1_results['title'] = (
    "1. The most popular three articles of all time?")
q1_results['ending'] = " views"

q2_results = dict()
q2_results['title'] = (
    "2. Who are the most popular article authors of all time?")
q2_results['ending'] = " views"

q3_results = dict()
q3_results['title'] = (
    "3. On which days did more than 1% of requests lead to errors?")
q3_results['ending'] = "%"


# Get query results from databse and return them
def get_results(query):
    db = psycopg2.connect(database=database_name)
    c = db.cursor()
    c.execute(query)
    results = c.fetchall()
    db.close()
    return results


# Print results method
def print_query_results(query_results):
    print (query_results['title'])
    for result in query_results['results']:
        print ('\t' + str(result[0]) + ': ' +
               str(result[1]) +
               query_results['ending'])

# Store query results
q1_results['results'] = get_results(q1)
q2_results['results'] = get_results(q2)
q3_results['results'] = get_results(q3)

# Print query results
print_query_results(q1_results)
print_query_results(q2_results)
print_query_results(q3_results)
