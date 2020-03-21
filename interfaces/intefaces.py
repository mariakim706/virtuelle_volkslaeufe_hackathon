"""
Ein Basisatz an interfaces zwischen Client - Server
"""

# Uniquification der Nutzer (user info für die uniqueness um die User nicht mit so dusseligen nickname12345 zu enttäuschen)
user_id = create_uunique_ID(nickname, user_information)

# Dem Nutzer wird eine match ID zugewiesen, wenn die Verfügbagen Sessions mit seinen Settings übereinstimmt
match_id = search_match(match_settings, user_id)

# Beitritt in die zugewiesene Session
joined_successfull = join_match(match_id, user_id)

# Generisches messaging: "Lauf beginnt in ...", "Du hast XY überholt", "Neuer Tag, neuer Lauf?"
received_successfull = send_notification(user_id, message)

# User status updates: 1/4-, 1/3-, 1/2- ... der Strecke absolviert; ins Ziel eingelaufen.
received_successfull = send_current_status(user_id, status)

# Game notification: Wer ist duchs Ziel gelaufen, Session-seitig: lauf beendet?
game_status = send_game_notifications(user_id, game_status)

# Send Goodies
received_trophies = send_xp_and_badges(user_id, user_session_results)
