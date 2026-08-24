"use strict";
const assert=require("assert");
const api=require("../assets/js/balance-analysis-calculators.js");

const parsed=api.parseCsv('name,note\n"Ember, Tide","said ""go"""\n');
assert.strictEqual(parsed[0].name,"Ember, Tide");
assert.strictEqual(parsed[0].note,'said "go"');
assert.throws(()=>api.parseCsv("a,b\n1\n"),/fields/);
assert.throws(()=>api.parseCsv('a,b\n"open,2\n'),/unclosed/);

const interval=api.wilson(12,20);
assert(Math.abs(interval.rate-.6)<1e-12);
assert(interval.low>.38&&interval.low<.39);
assert(interval.high>.78&&interval.high<.79);
assert.throws(()=>api.wilson(21,20),/exceed/);

const win=api.analyzeWin({wins:12,games:20,target:50,tolerance:10});
assert.strictEqual(win.stats.games,20);
assert.strictEqual(win.rows[0][1],"60.0%");
assert.throws(()=>api.analyzeWin({wins:6,games:5,target:50,tolerance:10}),/exceed/);

const seat=api.analyzeSeat(api.parseCsv("game_id,version,player_count,winning_seat,duration_minutes\n1,A,2,1,40\n2,A,2,2,44\n3,A,2,1,42\n4,A,2,2,43"),{allowed:10,minGames:4});
assert.strictEqual(seat.rows.length,2);
assert.strictEqual(seat.stats.groups,1);

const matchup=api.analyzeMatchups(api.parseCsv("game_id,version,faction_a,faction_b,winner,duration_minutes\n1,A,Ember,Tide,Ember,50\n2,A,Tide,Ember,Tide,51\n3,A,Ember,Tide,draw,52"),{allowed:10,minGames:2});
assert.strictEqual(matchup.rows.length,1);
assert.strictEqual(matchup.rows[0][2],"2");
assert.strictEqual(matchup.rows[0][3],"1");

const counts=api.analyzePlayerCounts(api.parseCsv("game_id,version,player_count,duration_minutes,score_spread\n1,A,2,40,8\n2,A,2,44,10\n3,A,3,60,14\n4,A,3,64,16"),{baseline:2,threshold:20,minGames:2});
assert.strictEqual(counts.rows.length,2);
assert.strictEqual(counts.stats.games,4);

const scores=api.analyzeScorePaths(api.parseCsv("game_id,player_id,won,total_score,category,points\n1,P1,yes,10,A,7\n1,P1,yes,10,B,3\n1,P2,no,8,A,4\n1,P2,no,8,B,4"),{shareThreshold:60,liftThreshold:20,minPlayers:2});
assert.strictEqual(scores.stats.games,1);
assert.strictEqual(scores.rows.length,2);
assert.strictEqual(scores.rows[0][0],"A");

console.log("balance_analysis_fixtures: all assertions passed");
