// contract.test.js
//
// The game-adapter contract for the Total Annihilation package: every surface
// the studio's shared UI reads off a game adapter, asserted here so a change
// to a field shape is caught before it reaches a consumer. Also proves the
// view3d re-export resolves the @coreprime/kbot-game3d team palette.
//
// Runs under node's built-in runner: `node --test contract.test.js`.

import test from 'node:test'
import assert from 'node:assert/strict'

import { game } from './index.js'
import { teamSides, projectileFallbackColors, lodHidePatterns, view3d } from './view3d.js'

test('identity and branding', () => {
  assert.equal(game.id, 'totala')
  assert.ok(game.label && typeof game.label === 'string', 'label')
  assert.ok(game.branding && typeof game.branding.headerLogo === 'string', 'branding.headerLogo')
  assert.match(game.branding.headerLogo, /^\/branding\//, 'logo served from /branding/')
  assert.ok(game.branding.chip && game.branding.chip.short && game.branding.chip.color, 'chip metadata')
  assert.match(game.branding.icon || '', /^data:image\/png;base64,/, 'application icon data URI')
})

test('welcome fx theme shape', () => {
  assert.equal(game.welcomeFx.style, 'beam')
  assert.equal(typeof game.welcomeFx.hot, 'function')
  assert.equal(typeof game.welcomeFx.spark, 'function')
})

test('resources and default keys', () => {
  assert.ok(Array.isArray(game.resources) && game.resources.length > 0, 'resources array')
  for (const r of game.resources) {
    assert.ok(r.key && r.label && r.costField && r.color, `resource ${r.key} fields`)
  }
  assert.ok(game.defaultKeys && typeof game.defaultKeys === 'object', 'defaultKeys')
})

test('view3d resolves the game3d team palette', () => {
  assert.ok(Array.isArray(teamSides) && teamSides.length > 0, 'teamSides from @coreprime/kbot-game3d')
  assert.ok(projectileFallbackColors && typeof projectileFallbackColors === 'object', 'projectileFallbackColors')
  assert.ok(Array.isArray(lodHidePatterns), 'lodHidePatterns')
  assert.equal(view3d.teamSides, teamSides, 'view3d bundles teamSides')
  assert.equal(game.view3d, view3d, 'game exposes view3d')
})
