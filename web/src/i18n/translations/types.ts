export interface Dictionary {
  nav: {
    home: string
    about: string
    menu: string
    gallery: string
    reservations: string
    contact: string
    admin: string
  }
  cta: {
    reserve: string
    viewMenu: string
    seeMore: string
    backHome: string
    call: string
  }
  footer: {
    description: string
    hoursTitle: string
    addressTitle: string
    contactTitle: string
    followUs: string
    legalLinks: {
      privacy: string
      legalNotice: string
      cookies: string
    }
    rightsReserved: string
  }
  cookieBanner: {
    message: string
    acceptAll: string
    rejectAll: string
    configure: string
    settingsTitle: string
    settingsIntro: string
    necessary: string
    necessaryDesc: string
    analytics: string
    analyticsDesc: string
    save: string
    readMore: string
  }
  demo: {
    badge: string
    bannerText: string
    viewDemoPage: string
    title: string
    intro: string
    bookingTitle: string
    bookingText: string
    bookingCta: string
    menuTitle: string
    menuText: string
    menuCta: string
    sampleTitle: string
    sampleText: string
    sampleConfirm: string
    sampleCancel: string
    sampleModify: string
    sampleNone: string
    adminTitle: string
    adminText: string
    adminCta: string
    resetTitle: string
    resetText: string
    resetCta: string
    resetDone: string
  }
  home: {
    heroKicker: string
    heroTitle: string
    heroSubtitle: string
    aboutTitle: string
    aboutText: string
    menuTitle: string
    menuText: string
    galleryTitle: string
    galleryText: string
    hoursAndLocationTitle: string
    hoursAndLocationCta: string
  }
  notFound: {
    title: string
    text: string
  }
  about: {
    kicker: string
    title: string
    historyLabel: string
    philosophyLabel: string
    cuisineLabel: string
    ctaMenu: string
  }
  gallery: {
    kicker: string
    title: string
    description: string
    imageCounter: string
    close: string
    previous: string
    next: string
  }
  menu: {
    kicker: string
    title: string
    description: string
    legendTitle: string
    filterLabel: string
    filterAll: string
    emptyCategory: string
    allergensLabel: string
    recommendedLabel: string
  }
  reservation: {
    kicker: string
    title: string
    description: string
    steps: {
      partySize: string
      date: string
      time: string
      details: string
      summary: string
    }
    back: string
    continue: string
    partySize: {
      question: string
      guestsLabel: string
      guestSingular: string
      moreThan: string
      moreThanMessage: string
    }
    date: {
      question: string
      closedDay: string
    }
    time: {
      question: string
      loading: string
      noSlots: string
      duration: string
    }
    details: {
      question: string
      name: string
      email: string
      emailError: string
      phone: string
      phoneError: string
      zone: string
      notes: string
      notesPlaceholder: string
      privacyLabel: string
      privacyLink: string
    }
    summary: {
      question: string
      partySizeLabel: string
      dateLabel: string
      timeLabel: string
      zoneLabel: string
      nameLabel: string
      emailLabel: string
      phoneLabel: string
      notesLabel: string
      edit: string
      submit: string
      submitting: string
      reassignedNotice: string
      errorGeneric: string
    }
    confirmation: {
      pendingTitle: string
      pendingText: string
      code: string
      status: string
      statusPending: string
      statusConfirmed: string
      statusCancelled: string
      backHome: string
      viewMenu: string
      emailsTitle: string
      emailsIntro: string
      tabClient: string
      tabRestaurant: string
      tabReminder: string
    }
  }
  manage: {
    loading: string
    notFoundTitle: string
    notFoundText: string
    backHome: string
    yourBooking: string
    confirm: {
      kicker: string
      title: string
      text: string
      button: string
      successTitle: string
      successText: string
      alreadyTitle: string
      alreadyText: string
      blockedCancelled: string
    }
    cancel: {
      kicker: string
      title: string
      text: string
      button: string
      successTitle: string
      successText: string
      alreadyTitle: string
      alreadyText: string
    }
    modify: {
      kicker: string
      title: string
      text: string
      blockedCancelled: string
      submit: string
      submitting: string
      successTitle: string
      successText: string
      errorGeneric: string
    }
  }
  admin: {
    login: {
      title: string
      subtitle: string
      username: string
      password: string
      submit: string
      error: string
      hint: string
    }
    nav: {
      reservations: string
      settings: string
      backToSite: string
    }
    reservations: {
      title: string
      today: string
      viewList: string
      viewGrid: string
      searchPlaceholder: string
      filterAll: string
      statusPending: string
      statusConfirmed: string
      statusCancelled: string
      newReservation: string
      noResults: string
      colTime: string
      colGuests: string
      colZone: string
      colTable: string
      colCustomer: string
      colStatus: string
      colActions: string
      viewDetail: string
      gridEmptyTable: string
    }
    detail: {
      title: string
      close: string
      markPending: string
      markConfirmed: string
      markCancelled: string
      moveTable: string
      moveTableLabel: string
      moveTableSave: string
      customer: string
      notes: string
      noNotes: string
      createdAt: string
      origin: string
      originAdmin: string
      originOnline: string
      sendReminderNow: string
      reminderSent: string
    }
    newReservation: {
      title: string
      subtitle: string
      submit: string
      cancel: string
      success: string
    }
    reminderSimulator: {
      button: string
      title: string
      running: string
      none: string
      summary: string
      close: string
    }
    settings: {
      title: string
      blockedTitle: string
      blockedIntro: string
      blockedDateLabel: string
      blockedReasonLabel: string
      blockedReasonPlaceholder: string
      blockedAdd: string
      blockedEmpty: string
      remove: string
      hoursTitle: string
      hoursIntro: string
      closedToggle: string
      addService: string
      removeService: string
      serviceStart: string
      serviceEnd: string
      save: string
      saved: string
      tablesTitle: string
      tablesIntro: string
      tableLabel: string
      tableZone: string
      tableCapacity: string
      addTable: string
      removeTable: string
    }
  }
  legal: {
    lastUpdated: string
    cookieTable: {
      name: string
      provider: string
      purpose: string
      duration: string
      type: string
      necessary: string
      analytics: string
    }
  }
  contact: {
    kicker: string
    title: string
    description: string
    addressTitle: string
    hoursTitle: string
    phoneTitle: string
    emailTitle: string
    socialTitle: string
    mapTitle: string
    directionsCta: string
  }
}
