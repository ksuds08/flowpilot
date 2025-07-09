#!/usr/bin/env bash
# Bulk‑create FlowPilot issues via GitHub CLI
# Usage: gh auth login (if needed) && bash scripts/create_issues.sh

REPO="ksuds08/flowpilot"

create_issue() {
  TITLE="$1"
  BODY="$2"
  LABELS="$3"
  gh issue create --repo "$REPO" --title "$TITLE" --body "$BODY" --label "$LABELS" --project "MVP Roadmap"
}

# ---- Technical Epics ----
create_issue "[Epic] Foundations & Tech Skeleton" "Repo scaffolding, CI, Auth, DB schema." "epic,backend" ""
create_issue "[Epic] Integrations (Email & Calendar)" "Gmail, Outlook, Calendar OAuth." "epic,backend" ""
create_issue "[Epic] Inbound & Booking" "Lead parser, auto‑reply, booking widget." "epic,feature" ""
create_issue "[Epic] Onboarding" "Contracts, invoices, intake forms." "epic,feature" ""
create_issue "[Epic] Delivery & Updates" "Activity tracker, weekly status drafts." "epic,feature" ""
create_issue "[Epic] Priority Inbox" "Missed‑deadline detection, nudge drafts." "epic,feature" ""
create_issue "[Epic] Client Portal" "Read‑only portal, progress timeline, uploads." "epic,frontend" ""
create_issue "[Epic] Pricing & Billing" "Stripe metered billing, upgrade flow." "epic,dev‑ops" ""

# ---- Persona User Stories ----
# General Solopreneur
create_issue "Auto follow‑up with new leads" "As a solopreneur, I want to automatically follow up with leads after they contact me so that I don’t lose potential clients." "user‑story,solopreneur" ""
create_issue "Daily summary of important tasks" "As a solopreneur, I want to receive a daily summary of important tasks so that I stay focused and avoid forgetting anything." "user‑story,solopreneur" ""
create_issue "Automated client progress updates" "As a solopreneur, I want to keep clients updated on project progress without writing manual emails." "user‑story,solopreneur" ""

# Freelance Designer
create_issue "Designer onboarding forms" "As a freelance designer, I want to auto‑send onboarding forms after a proposal is accepted." "user‑story,designer" ""
create_issue "Designer feedback reminders" "As a freelance designer, I want to automatically remind clients when I’m waiting on feedback." "user‑story,designer" ""
create_issue "Designer project tracking" "As a freelance designer, I want to track multiple client projects without a kanban board." "user‑story,designer" ""

# Coach
create_issue "Coach welcome sequence" "As a coach, I want new clients to automatically receive a welcome sequence." "user‑story,coach" ""
create_issue "Coach session summaries" "As a coach, I want to generate personalized summaries after each session." "user‑story,coach" ""
create_issue "Coach session reminders" "As a coach, I want to automate session reminders and rebooking nudges." "user‑story,coach" ""

# Creative Agency of One
create_issue "Client self‑service portal" "As a solo creative agency, I want each client to have a self‑service portal." "user‑story,agency" ""
create_issue "Automated proposals & contracts" "As a creative agency, I want to automate proposal and contract delivery after discovery calls." "user‑story,agency" ""
create_issue "Alerts for unresponsive clients" "As a creative agency, I want to receive alerts when a client is unresponsive." "user‑story,agency" ""

# Consultant / Freelancer
create_issue "AI draft responses" "As a freelancer, I want AI to write draft responses to client emails." "user‑story,consultant" ""
create_issue "Weekly progress email to all clients" "As a consultant, I want a weekly email to go out to all clients showing progress and next steps." "user‑story,consultant" ""
create_issue "Request testimonials automatically" "As a freelancer, I want to automatically request reviews/testimonials after project completion." "user‑story,consultant" ""

echo "✅ All issues created and added to the project board!"
