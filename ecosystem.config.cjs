module.exports = {
  apps: [
    {
      name: "dashboard",
      script: "npm",
      args: "run preview",
      cwd: "/path/to/your/project", // EDIT THIS: Path to the project
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
}; 