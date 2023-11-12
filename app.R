library(shiny)

ui <- function() {
  tagList(
    tags$head(
      tags$script(src = "index.js")
    ),
    tags$link(rel = "stylesheet", href="main.css"),
    div(id = "app"),
    tags$script(
      HTML(
        "
        $(document).on('shiny:connected', function() {
          App = new window.fbApp({target: document.getElementById('app')})
        })
        "
      )
    )
  )
}


server <- function(input, output, session) {
  observe({
    print(input$dataset)
  })
}

shinyApp(ui, server)
