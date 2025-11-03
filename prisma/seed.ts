import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

// Load environment variables
config({ path: ".env.local" });
config({ path: ".env" });

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

async function main() {
  console.log("🌱 Seeding database...");

  // Create forum categories
  const categories = [
    {
      slug: "windows",
      name: "Windows",
      desc: "Windows troubleshooting, repairs, and optimization",
      icon: "Monitor",
      order: 1,
    },
    {
      slug: "macos",
      name: "macOS",
      desc: "Mac troubleshooting and repairs",
      icon: "Apple",
      order: 2,
    },
    {
      slug: "linux",
      name: "Linux",
      desc: "Linux distributions and troubleshooting",
      icon: "Terminal",
      order: 3,
    },
    {
      slug: "networking",
      name: "Networking",
      desc: "Network issues, Wi-Fi, DNS, and connectivity",
      icon: "Network",
      order: 4,
    },
    {
      slug: "storage",
      name: "Storage & Drives",
      desc: "Hard drives, SSDs, disk errors, and data recovery",
      icon: "HardDrive",
      order: 5,
    },
    {
      slug: "laptops",
      name: "Laptops",
      desc: "Laptop-specific repairs and issues",
      icon: "Laptop",
      order: 6,
    },
    {
      slug: "peripherals",
      name: "Peripherals",
      desc: "Keyboards, mice, monitors, and other devices",
      icon: "Usb",
      order: 7,
    },
    {
      slug: "build-upgrade",
      name: "Build & Upgrade",
      desc: "PC building, component upgrades, and compatibility",
      icon: "Cpu",
      order: 8,
    },
    {
      slug: "mobile",
      name: "Mobile Devices",
      desc: "Smartphones and tablets",
      icon: "Smartphone",
      order: 9,
    },
    {
      slug: "tool-feedback",
      name: "Tool Feedback",
      desc: "Suggestions and bug reports for RepairLoader tools",
      icon: "Wrench",
      order: 10,
    },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }

  console.log(`✅ Created ${categories.length} categories`);

  // Create common tags
  const tags = [
    { slug: "boot-issue", name: "Boot Issue" },
    { slug: "bsod", name: "BSOD" },
    { slug: "performance", name: "Performance" },
    { slug: "drivers", name: "Drivers" },
    { slug: "wifi", name: "Wi-Fi" },
    { slug: "ethernet", name: "Ethernet" },
    { slug: "dns", name: "DNS" },
    { slug: "ssd", name: "SSD" },
    { slug: "hdd", name: "HDD" },
    { slug: "nvme", name: "NVMe" },
    { slug: "data-recovery", name: "Data Recovery" },
    { slug: "disk-error", name: "Disk Error" },
    { slug: "gpu", name: "GPU" },
    { slug: "cpu", name: "CPU" },
    { slug: "ram", name: "RAM" },
    { slug: "motherboard", name: "Motherboard" },
    { slug: "power-supply", name: "Power Supply" },
    { slug: "overheating", name: "Overheating" },
    { slug: "virus", name: "Virus/Malware" },
    { slug: "update-issue", name: "Update Issue" },
    { slug: "activation", name: "Activation" },
    { slug: "battery", name: "Battery" },
    { slug: "screen", name: "Screen" },
    { slug: "keyboard", name: "Keyboard" },
    { slug: "trackpad", name: "Trackpad" },
    { slug: "audio", name: "Audio" },
    { slug: "usb", name: "USB" },
    { slug: "windows-11", name: "Windows 11" },
    { slug: "windows-10", name: "Windows 10" },
    { slug: "ubuntu", name: "Ubuntu" },
    { slug: "macos-sonoma", name: "macOS Sonoma" },
    { slug: "solved", name: "Solved" },
  ];

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: tag,
      create: tag,
    });
  }

  console.log(`✅ Created ${tags.length} tags`);

  // Create initial tools
  const tools = [
    {
      slug: "system-info",
      name: "System Information",
      desc: "Detect your system specs, browser capabilities, and hardware information instantly in your browser.",
      category: "diagnostics",
      icon: "Info",
      order: 1,
    },
    {
      slug: "network-doctor",
      name: "Network Doctor",
      desc: "Test your internet connection, DNS resolution, and network connectivity to diagnose connection issues.",
      category: "diagnostics",
      icon: "Network",
      order: 2,
    },
    {
      slug: "disk-health",
      name: "Disk Health Check",
      desc: "Learn how to check your drive's S.M.A.R.T. status and health indicators to prevent data loss.",
      category: "diagnostics",
      icon: "HardDrive",
      order: 3,
    },
    {
      slug: "port-checker",
      name: "Port Checker",
      desc: "Test if specific ports are open and reachable on your network or firewall.",
      category: "networking",
      icon: "Wifi",
      order: 4,
    },
    {
      slug: "bootable-usb",
      name: "Bootable USB Guide",
      desc: "Step-by-step guide to creating bootable Windows, Linux, or recovery USB drives with Rufus and Ventoy.",
      category: "tools",
      icon: "Usb",
      order: 5,
    },
    {
      slug: "windows-troubleshooter",
      name: "Windows Troubleshooter",
      desc: "Interactive decision tree to diagnose and fix common Windows problems with guided steps.",
      category: "repair",
      icon: "Wrench",
      order: 6,
    },
  ];

  for (const tool of tools) {
    await prisma.tool.upsert({
      where: { slug: tool.slug },
      update: tool,
      create: tool,
    });
  }

  console.log(`✅ Created ${tools.length} tools`);

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
