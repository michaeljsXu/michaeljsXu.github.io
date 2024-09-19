document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("project-container");
    let projects = [];
  
    // Fetch projects from JSON file
    fetch('projects.json')
      .then(response => response.json())
      .then(data => {
        projects = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        displayProjects(projects.slice(0, 3));  // Display the first 3 projects initially
      });
  
    // Function to dynamically generate project HTML
    function displayProjects(projectsToDisplay) {
      projectsToDisplay.forEach(project => {
        const projectCard = `
          <div class="col s12 m6 l4">
            <div class="card medium">
              <div class="card-image waves-effect waves-block waves-light">
                <img alt="${project.name}" src="${project.image}" class="activator" style="height: 100%; width: 100%" />
              </div>
              <div class="card-content">
                <span class="card-title activator light-blue-text hoverline">
                  ${project.name}  <i class="mdi-navigation-more-vert right"></i>
                </span>
                <div><b>${project.date}</b></div>
                <p>${project.description}</p>
                
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text"><small>Accomplishments</small><i class="mdi-navigation-close right"></i></span>
                <ul>
                  <li><b>Tools:</b> ${project.tools}</li>
                  ${project.accomplishments.map(item => `<li>${item}</li>`).join('')}
                </ul>
                <div class="card-action">
                  <a href="${project.report_link}" target="_blank" class="btn-floating btn-large waves-effect waves-light blue-grey">
                    <i class="fa fa-external-link"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
        container.insertAdjacentHTML('beforeend', projectCard);
      });
    }
  
    // Show more projects when the button is clicked
    document.getElementById("showMoreBtn").addEventListener("click", function () {
      const remainingProjects = projects.slice(3);  // Get the rest of the projects
      displayProjects(remainingProjects);
  
      // Hide the button after showing all projects
      this.style.display = 'none';
    });
  });
  