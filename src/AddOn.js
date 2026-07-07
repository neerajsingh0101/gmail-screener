// The Gmail side panel add-on: open any email and approve or reject its
// sender without leaving Gmail. With no email open, the add-on's home card
// lists everyone awaiting review. Enabled via Deploy > Test deployments >
// Install (see README).

// Contextual card — shown when a message is open.
function onGmailMessageOpen(e) {
  const message = Gmail.Users.Messages.get('me', e.gmail.messageId, {
    format: 'metadata',
    metadataHeaders: ['From'],
  });
  const from = headerValue(message, 'From') || '';
  return buildSenderCard(normalizeEmail(from), '');
}

// Home card — shown when the add-on is opened without a message.
function onAddOnHomepage() {
  const senders = pendingSenders();
  const builder = CardService.newCardBuilder().setHeader(
    CardService.newCardHeader()
      .setTitle('Gmail Screener')
      .setSubtitle(senders.length + ' awaiting review')
  );

  const section = CardService.newCardSection();
  if (senders.length === 0) {
    section.addWidget(
      CardService.newTextParagraph().setText('Nothing pending. Enjoy the quiet inbox.')
    );
  }
  senders.slice(0, 25).forEach(function (sender) {
    section.addWidget(
      CardService.newDecoratedText()
        .setTopLabel(sender.email)
        .setText(sender.name)
        .setBottomLabel(sender.count + ' held · ' + sender.latestSubject)
        .setWrapText(true)
    );
    section.addWidget(verdictButtons(sender.email));
  });
  if (senders.length > 25) {
    section.addWidget(
      CardService.newTextParagraph().setText(
        '…and ' + (senders.length - 25) + ' more on the dashboard.'
      )
    );
  }

  return builder.addSection(section).build();
}

function buildSenderCard(email, notice) {
  const verdict = getVerdict(email);
  const exemption = exemptionMatch(email, '');

  let status;
  if (verdict === VERDICT.approved) {
    status = '✅ Approved — mail from this sender is delivered normally.';
  } else if (verdict === VERDICT.rejected) {
    status = '🚫 Rejected — mail from this sender goes to ' + LABELS.rejected + '.';
  } else if (exemption) {
    status = '✨ Exempt (' + exemption + ') — delivered without screening.';
  } else {
    status = '⏳ Awaiting your verdict — held in ' + LABELS.pending + '.';
  }

  const section = CardService.newCardSection()
    .addWidget(
      CardService.newDecoratedText().setTopLabel('Sender').setText(email).setWrapText(true)
    )
    .addWidget(
      CardService.newTextParagraph().setText((notice ? notice + '<br><br>' : '') + status)
    )
    .addWidget(verdictButtons(email));

  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle('Gmail Screener'))
    .addSection(section)
    .build();
}

function verdictButtons(email) {
  return CardService.newButtonSet()
    .addButton(
      CardService.newTextButton()
        .setText('👍 Approve')
        .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
        .setBackgroundColor('#1e8e3e')
        .setOnClickAction(
          CardService.newAction().setFunctionName('addonApprove').setParameters({ email: email })
        )
    )
    .addButton(
      CardService.newTextButton()
        .setText('👎 Reject')
        .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
        .setBackgroundColor('#d93025')
        .setOnClickAction(
          CardService.newAction().setFunctionName('addonReject').setParameters({ email: email })
        )
    );
}

function addonApprove(e) {
  const email = e.parameters.email;
  const released = approveSender(email);
  return addonActionResponse(
    email,
    '👍 Approved ' + email + ' — released ' + released + ' held email(s) to your inbox.'
  );
}

function addonReject(e) {
  const email = e.parameters.email;
  const moved = rejectSender(email);
  return addonActionResponse(
    email,
    '👎 Rejected ' + email + ' — moved ' + moved + ' email(s) to ' + LABELS.rejected + '.'
  );
}

function addonActionResponse(email, text) {
  return CardService.newActionResponseBuilder()
    .setNotification(CardService.newNotification().setText(text))
    .setNavigation(CardService.newNavigation().updateCard(buildSenderCard(email, text)))
    .build();
}
