(function(){
  var LEAGUE_NAMES = { PL:"Premier League", LL:"La Liga", SA:"Serie A" };
  var LEAGUE_DOT = { PL:"#6f9fd6", LL:"#e8654a", SA:"#4ea89a" };
  var CREST_COLORS = ["#f2c14e","#e8654a","#4ea89a","#6f9fd6","#b083c9","#d8c15a"];

  function crestColor(name){
    var h = 0;
    for (var i=0;i<name.length;i++) h = (h*31 + name.charCodeAt(i)) >>> 0;
    return CREST_COLORS[h % CREST_COLORS.length];
  }
  function initials(name){
    var parts = name.split(" ");
    if (parts.length === 1) return name.substring(0,2).toUpperCase();
    return (parts[0][0] + parts[parts.length-1][0]).toUpperCase();
  }

  var TODAY = [
    { league:"PL", home:"Manchester City", away:"Arsenal", stadium:"Etihad Stadium", live:true, minute:"63'", score:[2,1] },
    { league:"LL", home:"Real Madrid", away:"Barcelona", stadium:"Santiago Bernabéu", live:false, kickoff:"20:00" },
    { league:"SA", home:"Juventus", away:"Inter Milan", stadium:"Allianz Stadium", live:true, minute:"27'", score:[0,0] }
  ];

  var UPCOMING = [
    { league:"PL", home:"Liverpool", away:"Chelsea", day:"Tomorrow", time:"17:30" },
    { league:"LL", home:"Atlético Madrid", away:"Sevilla", day:"Sun", time:"18:00" },
    { league:"SA", home:"AC Milan", away:"Napoli", day:"Sun", time:"20:45" },
    { league:"PL", home:"Newcastle", away:"Aston Villa", day:"Mon", time:"19:00" }
  ];

  var RESULTS = [
    { league:"PL", home:"Manchester United", away:"Tottenham", score:[2,1] },
    { league:"LL", home:"Valencia", away:"Real Sociedad", score:[1,1] },
    { league:"SA", home:"Roma", away:"Lazio", score:[3,0] },
    { league:"LL", home:"Villarreal", away:"Real Betis", score:[0,2] }
  ];

  var PREDICT_MATCH = { league:"PL", home:"Manchester City", away:"Arsenal" };

  function crestEl(name, size){
    var cls = size === "mini" ? "mini-crest" : "crest";
    return '<div class="'+cls+'" style="background:'+crestColor(name)+'">'+initials(name)+'</div>';
  }

  function renderToday(filter){
    var el = document.getElementById("todayMatches");
    var data = TODAY.filter(function(m){ return filter === "all" || m.league === filter; });
    if (!data.length){
      el.innerHTML = '<div class="fixture-row" style="border:none;color:var(--text-dim);font-size:13px;">No matches today in this league.</div>';
      return;
    }
    el.innerHTML = data.map(function(m){
      var mid = m.live
        ? '<span class="score-mid">'+m.score[0]+' – '+m.score[1]+'</span>'
        : '<span class="score-mid kickoff">'+m.kickoff+'</span>';
      var badge = m.live
        ? '<span class="live-badge"><span class="live-dot"></span>'+m.minute+'</span>'
        : '<span class="live-badge" style="color:var(--text-dim)">Kickoff</span>';
      return (
        '<div class="match-card">'+
          '<div class="match-card-top"><span class="league-tag">'+LEAGUE_NAMES[m.league]+'</span>'+badge+'</div>'+
          '<div class="scoreline">'+
            '<div class="team-block">'+crestEl(m.home)+'<span class="team-code">'+initials(m.home)+'</span></div>'+
            mid+
            '<div class="team-block">'+crestEl(m.away)+'<span class="team-code">'+initials(m.away)+'</span></div>'+
          '</div>'+
          '<div class="match-stadium">'+m.stadium+'</div>'+
        '</div>'
      );
    }).join("");
  }

  function renderList(targetId, data, filter, mode){
    var el = document.getElementById(targetId);
    var filtered = data.filter(function(m){ return filter === "all" || m.league === filter; });
    if (!filtered.length){
      el.innerHTML = '<div class="fixture-row" style="border:none;color:var(--text-dim);font-size:13px;">Nothing here for this league yet.</div>';
      return;
    }
    el.innerHTML = filtered.map(function(m){
      var meta = mode === "result"
        ? '<div class="fixture-score">'+m.score[0]+' – '+m.score[1]+'</div>'
        : '<div class="fixture-time">'+m.day+' · '+m.time+'</div>';
      return (
        '<div class="fixture-row">'+
          '<div class="fixture-teams">'+
            '<div class="fixture-team-line"><span class="fixture-league-dot" style="background:'+LEAGUE_DOT[m.league]+'"></span>'+crestEl(m.home,"mini")+m.home+'</div>'+
            '<div class="fixture-team-line" style="margin-left:14px">'+crestEl(m.away,"mini")+m.away+'</div>'+
          '</div>'+
          '<div class="fixture-meta">'+meta+'</div>'+
        '</div>'
      );
    }).join("");
  }

  function renderPredict(){
    var m = PREDICT_MATCH;
    document.getElementById("predictMatch").innerHTML =
      '<div class="predict-team">'+crestEl(m.home)+'<span class="predict-team-name">'+m.home+'</span></div>'+
      '<span class="predict-vs">VS</span>'+
      '<div class="predict-team">'+crestEl(m.away)+'<span class="predict-team-name">'+m.away+'</span></div>';

    document.getElementById("predictOptions").innerHTML =
      '<button class="predict-btn" data-choice="home">'+m.home.split(" ").pop()+' win</button>'+
      '<button class="predict-btn" data-choice="draw">Draw</button>'+
      '<button class="predict-btn" data-choice="away">'+m.away.split(" ").pop()+' win</button>';

    var buttons = document.querySelectorAll(".predict-btn");
    buttons.forEach(function(btn){
      btn.addEventListener("click", function(){
        buttons.forEach(function(b){ b.disabled = true; b.classList.remove("chosen"); });
        btn.classList.add("chosen");
        var status = document.getElementById("predictStatus");
        status.textContent = "Prediction locked. Revealing after kickoff…";
        status.className = "predict-status";
        setTimeout(function(){
          var won = Math.random() > 0.45;
          var pointsEl = document.getElementById("pointsValue");
          if (won){
            pointsEl.textContent = parseInt(pointsEl.textContent,10) + 10;
            status.textContent = "Nice call — you earned 10 points.";
            status.className = "predict-status win";
          } else {
            status.textContent = "Not this time. The match ended differently.";
            status.className = "predict-status lose";
          }
        }, 1200);
      });
    });
  }

  function renderAll(filter){
    renderToday(filter);
    renderList("upcomingList", UPCOMING, filter, "fixture");
    renderList("resultsList", RESULTS, filter, "result");
  }

  document.querySelectorAll(".chip").forEach(function(chip){
    chip.addEventListener("click", function(){
      document.querySelectorAll(".chip").forEach(function(c){ c.classList.remove("active"); });
      chip.classList.add("active");
      renderAll(chip.dataset.league);
    });
  });

  document.querySelectorAll(".nav-item").forEach(function(item){
    item.addEventListener("click", function(){
      document.querySelectorAll(".nav-item").forEach(function(n){ n.classList.remove("active"); });
      item.classList.add("active");
      var note = document.getElementById("emptyNote");
      if (item.dataset.tab === "home"){
        note.classList.remove("show");
        return;
      }
      note.textContent = item.textContent.trim() + " is part of the next build — this preview covers Home.";
      note.classList.add("show");
      clearTimeout(window.__noteTimer);
      window.__noteTimer = setTimeout(function(){ note.classList.remove("show"); }, 3200);
    });
  });

  var today = new Date();
  document.getElementById("dateLine").textContent =
    today.toLocaleDateString(undefined, { weekday:"long", month:"long", day:"numeric" }) + " · matchday across Europe";

  renderAll("all");
  renderPredict();
})();