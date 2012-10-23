with (scope('Home', 'App')) {

  route('#', function() {
    // render nothing, then hide the content for now... we're using before-content!!
    render('');
    hide('content');

    var default_avatar_url = 'https://a248.e.akamai.net/assets.github.com/images/gravatars/gravatar-user-420.png';

    var stats_container, leaderboard_container;
    
    render({ into: 'before-content' },
      section({ id: 'homepage' },

        div({ style: 'float: left; margin-right: 10px' },

          div({ 'class': 'box' },
            div({ 'class': 'inner bigbox', style: 'width: 724px; height: 100px' },
              h1(span({ style: 'font-weight: bold' }, 'Bounty'), 'Source is a funding platform for open-source bugs and features.'),

              div({ 'class': 'begin-box' },
                div({ style: 'margin-left: 70px; margin-right: 40px; float: left; text-align: center; '},
                  a({ 'class': 'green', style: 'width: 200px; display: block', href: '#bounties' }, 'Browse All Bounties')
                ),
                div({ style: 'font-size: 30px; line-height: 40px; float: left; padding: 0 5px'}, 'or'),

                div({ style: 'width: 330px; float: left; text-align: center'},
                  form({ action: function(form_data) { set_route('#repos/search?query='+escape(form_data.query)) } },
                    text({ name: 'query', placeholder: 'Project Name' }),
                    submit({ value: 'Search', 'class': 'green', style: 'width: 80px; margin-left: 3px;' })
                  )
                )
              )
            )
          ),

          div({ 'class': 'faq-box', style: 'margin-right: 10px' },
            div({ 'class': 'inner' },
              h1("BACKERS"),
              p("Want to help fund your favorite open-source projects?"),
              a({ 'class': 'blue', href: '#faq/backers' }, "Learn More")
            )
          ),

          div({ 'class': 'faq-box', style: 'margin-right: 10px' },
            div({ 'class': 'inner' },
              h1("DEVELOPERS"),
              p("Want to earn money working on open-source projects?"),
              a({ 'class': 'blue', href: '#faq/developers' }, "Learn More")
            )
          ),

          div({ 'class': 'faq-box' },
            div({ 'class': 'inner' },
              h1("COMMITTERS"),
              p("Are you a committer on an open-source projects?"),
              a({ 'class': 'blue', href: '#faq/committers' }, "Learn More")
            )
          ),

          div({ style: 'clear: both' })

          // div({ 'class': 'box', style: 'margin-top: 10px' },
          //   div({ 'class': 'inner bigbox', style: 'width: 694px' },
          // 
          // 
          //   )
          // )
        ),

        div({ 'class': 'box', style: 'float: right' },
          stats_container=div({ 'class': 'inner stats', style: 'width: 120px; height: 278px' })
        ),
        
        div({ style: 'clear: both; padding-bottom: 10px' }),

        div({ 'class': 'box' },
          leaderboard_container=div({ 'class': 'inner leaderboard' })
        )
      )
    );

    BountySource.overview(function(response) {
      var data = (response.data||{});
      render({ into: stats_container },
        h2(a({ href: '#bounties' }, money(data.total_unclaimed))),
        h3({ 'class': 'orange-line' }, a({ href: '#bounties' }, 'Active Bount' + (data.total_unclaimed == 1 ? 'y' : 'ies'))),

        h2(a({ href: '#bounties' }, formatted_number(data.total_active_issues))),
        h3({ 'class': 'blue-line' }, a({ href: '#bounties' }, data.total_active_issues == 1 ? 'Issue with Bounty' : 'Issues with Bounties')),

        h2(a({ href: '#bounties' }, formatted_number(data.total_bounties_created_this_month))),
        h3({ 'class': 'green-line' }, a({ href: '#bounties' }, 'Bount' + (data.total_bounties_created_this_month == 1 ? 'y' : 'ies') + ' This Month'))
      );

      render({ into: leaderboard_container }, 
        section({ style: 'width: 390px'},
          div({ style: 'text-align: center' }, img({ src: 'images/icon-info.png' })),
          h2('Staff Picks'),
          ul(
            data.projects.featured.map(function(repo) {
              return li(img({ src: (repo.user.avatar_url),
                              style: 'width: 32px; height: 32px' }),
                a({ href: Repository.get_href(repo), style: 'color: #222' }, repo.display_name))
            })
          )
        ),
        section({ style: 'width: 200px'},
          div({ style: 'text-align: center' }, img({ src: 'images/icon-check.png' })),
          h2('Top Backers'),
          ul(
            data.backers.most_total_bounties.map(function(backer) {
              return li(img({ src: backer.avatar_url, style: 'width: 32px; height: 32px' }), backer.display_name)
            })
          )
        ),
        section({ style: 'width: 200px; margin-right: 0'},
          div({ style: 'text-align: center' }, img({ src: 'images/icon-info.png' })),
          h2('Top Developers'),
          ul(
            // most_submitted_solutions is dummy data. most_pull_requests isn't but doesn't have data
            data.developers.most_submitted_solutions.map(function(developer) {
              return li(img({ src: developer.avatar_url, style: 'width: 32px; height: 32px' }), developer.login)
            })
          )
        ),
        div({ style: 'clear: both' })
      );
    })
  });
  
}
